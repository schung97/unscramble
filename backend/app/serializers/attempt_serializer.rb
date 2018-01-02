class AttemptSerializer < ActiveModel::Serializer
  attributes :id, :success, :tries, :question, :time
  belongs_to :user
  belongs_to :word
end
