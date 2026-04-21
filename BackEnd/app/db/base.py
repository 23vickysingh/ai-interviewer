# Import all the models, so that Base hash them before being
# imported by Alembic or used by metadata
from app.db.base_class import Base  # noqa
from app.models.user import User  # noqa
from app.models.interview import Interview  # noqa
from app.models.message import Message  # noqa
from app.models.feedback import Feedback  # noqa
