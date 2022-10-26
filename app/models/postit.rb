class Postit < ApplicationRecord
  has_many :postit_mappings, dependent: :destroy 
  has_many :workspaces, through: :postit_mappings
end
