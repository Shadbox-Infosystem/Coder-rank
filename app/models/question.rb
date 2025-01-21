class Question < ApplicationRecord
  belongs_to :test
  has_many :answers, dependent: :destroy
  accepts_nested_attributes_for :answers, allow_destroy: true

  validates :question_type, inclusion: { in: ["MCQ", "Coding", "Theoretical"] }
  validates :content, :points, presence: true
end