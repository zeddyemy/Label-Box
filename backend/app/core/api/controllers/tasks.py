from datetime import timedelta
from flask import request
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, OperationalError )
from werkzeug.exceptions import UnsupportedMediaType
from flask_jwt_extended import create_access_token
from flask_jwt_extended.exceptions import JWTDecodeError
from jwt import ExpiredSignatureError, DecodeError
from email_validator import validate_email, EmailNotValidError, ValidatedEmail

from ....extensions import db
from ....models import AppUser, Task, Project
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import get_app_user
from ....utils.helpers.export_xl import export_to_excel
from ....utils.helpers.tasks import save_task_media


class TasksController:
    @staticmethod
    def get_tasks():
        try:
            page = request.args.get("page", 1, type=int)
            per_page = request.args.get("per_page", 5, type=int)
            project_id = request.args.get("project_id", None)
            
            if project_id:
                project: Project = Project.query.get(project_id)
                if not project:
                    return error_response("Project not found", 404)
                
                query = Task.query.filter_by(project_id=project_id).order_by(Task.created_at.desc())
            else:
                query = Task.query.order_by(Task.created_at.desc())
            
            if request.args.get('export', '').lower() == "excel":
                filename = "protect_tasks"
                return export_to_excel(query.all(), filename)
            
            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            
            tasks: list[Task] = pagination.items
            current_tasks = [task.to_dict() for task in tasks]
            extra_data = {
                "total": pagination.total,
                "tasks": current_tasks,
                "current_page": pagination.page,
                "total_pages": pagination.pages,
            }
            
            api_response = success_response("Tasks fetched successfully", 200, extra_data)
        except Exception as e:
            log_exception("An exception occurred adding a project:", e)
            api_response = error_response("An unexpected error occurred", 500)
        finally:
            db.session.close()
        
        return api_response
    
    
    @staticmethod
    def add_task():
        try:
            # Get the request data
            data = request.form.to_dict()
            
            project_id = data.get('project_id')
            task_img = request.files.get('task_img', '')
            task_img = request.files.getlist('task_img') or task_img
            
            if not task_img or not project_id:
                return error_response("Please provide both the task image and project ID", 400)
            
            task_media_id = save_task_media(media_file=task_img)
            
            # Create Task
            new_task = Task(
                project_id=project_id,
                media_id=task_media_id
            )
            db.session.add(new_task)
            db.session.commit()
            
            extra_data = {"task": new_task.to_dict()}
            
            api_response = success_response("Task added successfully", 200, extra_data)
            
        except Exception as e:
            log_exception("An exception occurred adding a task:", e)
            api_response = error_response("An unexpected error occurred", 500)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def get_task(task_id):
        try:
            task: Task = Task.query.get(task_id)
            if not task:
                return error_response("Task not found", 404)
            
            extra_data = {"task": task.to_dict()}
            
            api_response = success_response("Task fetched successfully", 200, extra_data)
        except Exception as e:
            log_exception("An exception occurred adding a project:", e)
            api_response = error_response("An unexpected error occurred", 500)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def edit_task(task_id):
        try:
            pass
        except Exception as e:
            log_exception("An exception occurred adding a project:", e)
            api_response = error_response("An unexpected error occurred", 500)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def delete_task(task_id):
        try:
            pass
        except Exception as e:
            log_exception("An exception occurred adding a project:", e)
            return error_response("An unexpected error occurred", 500)
        