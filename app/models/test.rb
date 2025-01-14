class Test < ApplicationRecord
  belongs_to :user
  has_many :respondents, dependent: :destroy

  # Enable nested attributes for respondents in forms
  accepts_nested_attributes_for :respondents, allow_destroy: true
end