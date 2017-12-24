class WordSerializer < ActiveModel::Serializer
  attributes :id, :word
  has_many :attempts
  has_many :users, through: :attempts
end
