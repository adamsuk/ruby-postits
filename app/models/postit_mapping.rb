class PostitMapping < ApplicationRecord
  belongs_to :postit
  belongs_to :workspace
end
