import uuid
from enum import Enum
from flask import current_app
from slugify import slugify
from sqlalchemy.orm import backref
from sqlalchemy import inspect, or_
from sqlalchemy.dialects.postgresql import UUID

from ..extensions import db
from .media import Media
from .role import Role, RoleNames
from ..utils.helpers.loggers import console_log
from ..utils.date_time import DateTimeUtils, datetime
from config import Config


class Task(db.Model):
    __tablename__ = "task"
    
    id: uuid.UUID = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    project_id = db.Column(UUID(as_uuid=True), db.ForeignKey('project.id'), nullable=False)
    media_id = db.Column(db.Integer(), db.ForeignKey('media.id'), nullable=True)
    created_at: datetime = db.Column(db.DateTime(timezone=True), default=DateTimeUtils.aware_utcnow)
    

    media = db.relationship('Media', backref='task_media')
    annotations = db.relationship('Annotation', backref='task', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Task {self.id} in Project {self.project_id}>'
    
    def update(self, **kwargs) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()
    
    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()
    
    def get_task_media(self):
        if self.media_id:
            the_media = Media.query.get(self.media_id)
            if the_media:
                return the_media.get_path()
            else:
                return None
        else:
            return None
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'project_id': self.project_id,
            'image_url': self.get_task_media(),
            'created_at': self.created_at,
            'annotations': [annotation.to_dict() for annotation in self.annotations] if self.annotations else None
        }
    
    def to_excel_data(self) -> dict:
        return {
            'Image URL': self.get_task_media(),
            'Date Created': self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }

