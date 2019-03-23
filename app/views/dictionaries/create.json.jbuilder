# frozen_string_literal: true

json.partial!('dictionary', dictionary: @dictionary)
json.created_at @dictionary.created_at.to_i
