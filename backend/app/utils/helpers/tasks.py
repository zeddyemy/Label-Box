import os
from threading import Thread
from flask import Flask, current_app
from werkzeug.datastructures import FileStorage

from ...models import Task
from .loggers import console_log, log_exception
from.media import save_media_files_to_temp, save_media


def async_save_task_media(app: Flask, media_file_paths, task: Task = None) -> int:
    with app.app_context():
        try:
            
            console_log("async media_file_paths", media_file_paths)
            if media_file_paths:
                for file_path in media_file_paths:
                    filename = os.path.basename(file_path)
                    console_log("filename", filename)
                    with open(file_path, 'rb') as media_file:
                        task_media = save_media(media_file, filename) # This saves image file, saves the path in db and return the Media instance
                        task_media_id = task_media.id
                        console_log("r task_media_id", task_media_id)
            elif not media_file_paths and task:
                if task.media_id:
                    task_media = task.media
                    task_media_id = task_media.id
                else:
                    task_media = None
                    task_media_id = None
            else:
                task_media = None
                task_media_id = None
            
            if not task_media:
                raise ValueError("No Task media to save")
            
            return task_media_id
        except Exception as e:
            log_exception()
            raise e

def save_task_media(media_file: FileStorage, task: Task = None):
    media_file_paths = save_media_files_to_temp(media_file)
    console_log("media_file_paths", media_file_paths)
    
    return async_save_task_media(current_app._get_current_object(), media_file_paths, task)