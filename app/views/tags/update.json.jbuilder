# frozen_string_literal: true

json.partial!('tag', tag: @tag)
json.updated_at I18n.l(@tag.updated_at)
