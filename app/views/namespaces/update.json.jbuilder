# frozen_string_literal: true

json.partial!('namespace', namespace: @namespace)
json.updated_at I18n.l(@namespace.updated_at)
