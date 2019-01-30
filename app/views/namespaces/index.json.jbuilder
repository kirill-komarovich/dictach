json.array! @namespaces do |namespace|
  json.id namespace.id
  json.title namespace.title

  if with_dictionaries?
    json.dictionaries do
      json.array! namespace.dictionaries do |dictionary|
        json.id dictionary.id
        json.title dictionary.title
      end
    end
  end
end
