from flask_restplus import Namespace, fields


class TaskDto:
    """
    Task serialization object
    """
    ns = Namespace('task', description='Task related operations')
    task = ns.model('task', {
        'private_id': fields.String(description='Task id'),
        'title': fields.String(required=True, description='Task title', max_length=500),
        'description': fields.String(description='Task description'),
        'created_at': fields.DateTime(description='Task creation date'),
        'updated_at': fields.DateTime(description='Task last update date'),
        'completed': fields.Boolean(description="Is task completed?", default=False)
    })

    task_create = ns.model('task', {
        'title': fields.String(required=True, description='Task title', max_length=500),
        'description': fields.String(description='Task description'),
    })

    task_update = ns.model('task', {
        'title': fields.String(required=True, description='Task title', max_length=500),
        'description': fields.String(description='Task description'),
        'completed': fields.Boolean(description='Task completed?'),
    })
