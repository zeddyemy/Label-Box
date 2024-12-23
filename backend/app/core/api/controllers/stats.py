from sqlalchemy import func
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, )

from ....models import AppUser, Project, Task, Annotation
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import  get_current_user


class StatsController:
    
    @staticmethod
    def get_stat_numbers():
        try:
            # current_user = get_current_user()
            # if not current_user:
            #     return error_response("Unauthorized", 401)
            
            # Total trips count and total amount
            project_query = Project.query.order_by(Project.created_at.desc())
            total_projects = project_query.count()
            
            # Total itineraries count and total amount
            tasks_query = Task.query.order_by(Task.created_at.desc())
            total_tasks = tasks_query.count()

            # Total expenses count and total amount
            annotations_query = Annotation.query.order_by(Annotation.annotated_at.desc())
            total_annotations = annotations_query.count()
            

            stats = {
                "total_projects": total_projects,
                "total_tasks": total_tasks,
                "total_annotations": total_annotations,
            }
            extra_data = {"stats": stats}
            
            api_response = success_response("Stat numbers fetched successfully", 200, extra_data)
        except (DataError, DatabaseError) as e:
            log_exception("Database error occurred fetching stat numbers", e)
            api_response = error_response('Error interacting with the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred fetching stat numbers:", e)
        
        return api_response


