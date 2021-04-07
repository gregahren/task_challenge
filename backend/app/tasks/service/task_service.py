import datetime
import uuid

from app import api
from app import db
from app.tasks.model.task import Task


def get_tasks(user_id):
    return Task.query.filter_by(user_id=user_id).all()


def create_task(data, user):
    new_task = Task(
        private_id=str(uuid.uuid4()),
        title=data['title'],
        description=data['description'],
        user_id=user.get('user_id'),
        created_at=datetime.datetime.utcnow()
    )

    save_changes(new_task)
    return new_task


def update_task(private_id, data, user):
    # get task
    task = Task.query.filter_by(private_id=private_id, user_id=user.get('user_id')).first()
    if task:
        task.updated_at = datetime.datetime.utcnow()
        task.title = data['title']
        task.description = data['description']
        task.completed = data['completed']

        save_changes(task)
        return task
    else:
        api.abort(404, "Task {} doesn't exist".format(private_id))


def save_changes(data):
    db.session.add(data)
    db.session.commit()
