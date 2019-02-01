# frozen_string_literal: true

json.array! @namespaces do |namespace|
  json.partial!('namespace', namespace: namespace)
  json.partial!('dictionaries', namespace: namespace) if with_dictionaries?
end
