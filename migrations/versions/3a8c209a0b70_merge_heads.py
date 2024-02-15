"""Merge heads

Revision ID: 3a8c209a0b70
Revises: 1ae33930216d, f95f14c2fcba
Create Date: 2024-02-15 00:13:00.845767

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3a8c209a0b70'
down_revision = ('1ae33930216d', 'f95f14c2fcba')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
