from datetime import timedelta
from flask import request
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, OperationalError )
from werkzeug.exceptions import UnsupportedMediaType
from flask_jwt_extended import create_access_token
from flask_jwt_extended.exceptions import JWTDecodeError
from jwt import ExpiredSignatureError, DecodeError
from email_validator import validate_email, EmailNotValidError, ValidatedEmail

from ....extensions import db
from ....models import AppUser, Task, Project, Annotation
from ....utils.date_time import DateTimeUtils, datetime
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import get_app_user
from ....utils.helpers.export_xl import export_to_excel


class AnnotationsController:
    @staticmethod
    def get_annotations():
        try:
            page = request.args.get("page", 1, type=int)
            per_page = request.args.get("per_page", 100, type=int)
            task_id = request.args.get("task_id", None)
            
            if task_id:
                task: Task = Task.query.get(task_id)
                if not task:
                    return error_response("Task not found", 404)
                
                query = Annotation.query.filter_by(task_id=task_id).order_by(Annotation.annotated_at.desc())
            else:
                query = Annotation.query.order_by(Annotation.annotated_at.desc())
            
            if request.args.get('export', '').lower() == "excel":
                filename = "task_annotations"
                return export_to_excel(query.all(), filename)
            
            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            
            annotations: list[Task] = pagination.items
            current_annotations = [ann.to_dict() for ann in annotations]
            extra_data = {
                "total": pagination.total,
                "annotations": current_annotations,
                "current_page": pagination.page,
                "total_pages": pagination.pages,
            }
            
            api_response = success_response("Annotations fetched successfully", 200, extra_data)
            
        except Exception as e:
            log_exception("An exception occurred fetching annotations:", e)
            api_response = error_response("An unexpected error occurred", 500)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def add_annotations():
        try:
            data = request.get_json()
            
            console_log("data", data)
            
            task_id = data.get('task_id')
            annotation_data = data.get('annotations')
            
            console_log("annotation_data", annotation_data)
            
            task = Task.query.get_or_404(task_id)
            if not task:
                return error_response("Task not found", 404)
            
            if not data or not annotation_data:
                return error_response("Annotation data is required", 400)
            
            # Validate the structure of annotation_data
            if not isinstance(annotation_data, list):
                return error_response("Invalid annotation data format", 400)
            
            annotations = []
            
            for ann in annotation_data:
                if 'label' not in ann or 'bounding_box' not in ann:
                    return error_response("Each annotation must have a label and a bounding_box.", 400)
                
                label = ann.get('label')
                bbox = ann.get('bounding_box')
                annotation_id = ann.get('id')
                
                if not all(k in bbox for k in ('x', 'y', 'width', 'height')):
                    return error_response("Bounding box must contain x, y, width, and height.", 400)
                
                if annotation_id:
                    # Check if annotation exists
                    annotation = Annotation.query.get(annotation_id)
                    if not annotation:
                        # Create new annotation
                        annotation = Annotation(
                            task=task,
                            label=label,
                            bounding_box=bbox
                        )
                        db.session.add(annotation)
                        db.session.commit()
                    else:
                        # Update existing annotation
                        annotation.update(
                            label=label,
                            bounding_box=bbox,
                            annotated_at=DateTimeUtils.aware_utcnow()
                        )
                        db.session.commit()
                    
                    annotations.append(annotation.to_dict())
            
            console_log("annotations", annotations)
            
            
            extra_data = {"annotations": annotations}
            
            api_response = success_response("Annotations added successfully", 201, extra_data)
            
        except Exception as e:
            log_exception("An exception occurred adding a annotation:", e)
            api_response = error_response("An unexpected error occurred", 500)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def get_annotation(annotation_id):
        try:
            pass
        except Exception as e:
            log_exception("An exception occurred adding a project:", e)
            api_response = error_response("An unexpected error occurred", 500)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def edit_annotations(annotation_id):
        try:
            pass
        except Exception as e:
            log_exception("An exception occurred adding a project:", e)
            api_response = error_response("An unexpected error occurred", 500)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def delete_annotations(annotation_id):
        try:
            pass
        except Exception as e:
            log_exception("An exception occurred adding a project:", e)
            api_response = error_response("An unexpected error occurred", 500)
        finally:
            db.session.close()
        
        return api_response