json.partial!('namespace', namespace: @namespace)
json.created_at I18n.l(@namespace.created_at)
