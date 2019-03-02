# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TagsDictionary, type: :model do
  subject { build(:tags_dictionary) }

  it { is_expected.to be_valid }

  describe 'associations' do
    it { is_expected.to belong_to(:tag) }
    it { is_expected.to belong_to(:dictionary) }
  end
end
