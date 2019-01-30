json.array! @namespaces do |namespace|
  json.id namespace.id
  json.title namespace.title

  render('dictionaries', namespace: namespace) if with_dictionaries?
end
