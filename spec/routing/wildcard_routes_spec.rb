require 'rails_helper'

RSpec.describe 'Wildcard routes', type: :routing do
  describe '*path' do
    it 'routes to statics#index' do
      expect(get: '/foo/bar').to route_to(
        controller: 'statics',
        action: 'index',
        path: 'foo/bar'
      )
    end
  end
end
