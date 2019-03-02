# frozen_string_literal: true

class TagsDictionary < ApplicationRecord
  belongs_to :tag
  belongs_to :dictionary
end
