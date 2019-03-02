# frozen_string_literal: true

json.partial!('tag', tag: @tag)
json.created_at I18n.l(@tag.created_at)
