from app import db


class Task(db.Model):
    """
    Task model
    """
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    private_id = db.Column(db.String(36), nullable=False, index=True, unique=True)
    title = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User')

    def __repr__(self):
        return "<Task '{}'>".format(self.title)
