class AttemptSerializer < ActiveModel::Serializer
  attributes :success, :tries
  belongs_to :user
  belongs_to :word 
end
