class Workspace < ApplicationRecord
  has_many :postit_mappings
  has_many :postits, through: :postit_mappings
end
