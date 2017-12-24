class AttemptSerializer < ActiveModel::Serializer
  attributes :id, :success, :tries
  belongs_to :user
  belongs_to :word
end
