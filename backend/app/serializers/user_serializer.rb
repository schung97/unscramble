class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :lastname
  has_many :attempts
  has_many :words, through: :attempts
end
