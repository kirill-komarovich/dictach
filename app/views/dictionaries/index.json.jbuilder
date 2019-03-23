# frozen_string_literal: true

json.dictionaries do
  json.array! @dictionaries do |dictionary|
    json.partial!('dictionary', dictionary: dictionary)
  end
end
json.meta do
  json.pages page_count
  json.records records_count
end
