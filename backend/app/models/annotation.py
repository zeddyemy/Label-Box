import uuid
from enum import Enum
from flask import current_app
from slugify import slugify
from sqlalchemy.orm import backref
from sqlalchemy import inspect, or_
from sqlalchemy.dialects.postgresql import UUID

from ..extensions import db
from .media import Media
from ..utils.helpers.loggers import console_log
from ..utils.date_time import DateTimeUtils, datetime
from config import Config


class Annotation(db.Model):
    __tablename__ = "annotation"
    
    id: uuid.UUID = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    task_id = db.Column(UUID(as_uuid=True), db.ForeignKey("task.id"))
    label: str = db.Column(db.String(50), nullable=True)
    bounding_box: dict = db.Column(db.JSON, nullable=False)  # To store bounding box coordinates
    annotated_at: datetime = db.Column(db.DateTime(timezone=True), default=DateTimeUtils.aware_utcnow)
    
    def __repr__(self) -> str:
        return f'<ID: {self.id}, label: {self.label}>'
    
    def __str__(self) -> str:
        return self.label.capitalize()
    
    def update(self, **kwargs) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()

    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'label': self.label,
            'task_id': self.task_id,
            'bounding_box': self.bounding_box,
            'annotated_at': self.annotated_at,
        }
    
    def to_excel_data(self) -> dict:
        return {
            "Label": self.label,
            "Bounding Box": self.bounding_box,
            'Date Annotated': self.annotated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }

