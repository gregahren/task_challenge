from flask import request
from flask_restplus import Resource

from app.admin.util.decorators import auth_required
from app.tasks.model.dto import TaskDto
from app.tasks.service.task_service import get_tasks, create_task, update_task, delete_task

ns = TaskDto.ns


@ns.route('/')
@ns.response(403, "Provide a valid auth token.")
class TaskList(Resource):
    @ns.doc('Get all tasks from user')
    @ns.marshal_list_with(TaskDto.task, envelope='data')
    @auth_required
    def get(self, user):
        """List all registered users"""
        return get_tasks(user)

    @ns.doc('Create task')
    @ns.response(201, 'Task successfully created.')
    @ns.expect(TaskDto.task_create, validate=True)
    @ns.marshal_with(TaskDto.task, code=201)
    @auth_required
    def post(self, user):
        data = request.json
        return create_task(data, user), 201


@ns.route('/<private_id>')
@ns.response(403, "Provide a valid auth token.")
class Task(Resource):
    @ns.doc('Update task')
    @ns.response(200, 'Task successfully updated.')
    @ns.response(404, 'Task does not exist. Couldnt update.')
    @ns.marshal_with(TaskDto.task, code=200)
    @ns.expect(TaskDto.task_update, validate=True)
    @auth_required
    def put(self, private_id, user):
        data = request.json
        return update_task(private_id, data, user), 200

    @ns.doc('Delete task')
    @ns.response(202, 'Task successfully deleted.')
    @ns.response(404, 'Task does not exist. Couldnt update.')
    @ns.marshal_with(TaskDto.task, code=202)
    @auth_required
    def delete(self, private_id, user):
        return delete_task(private_id, user), 202
