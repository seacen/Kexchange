Rails.application.routes.draw do
  get 'problems/index'

  get 'problems/new'

  get 'problems/create'

  get 'problems/edit'

  get 'problems/update'

  get 'problems/show'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  # You can have the root of your site routed with "root"
  # Example of regular route:
  scope '(:locale)', locale: /en|zh-CN/ do
    root 'sessions#index', as: :home
    get 'login' => 'sessions#login', as: :login
    post 'sessions/do_login', as: :signin
    delete 'sessions/logout', as: :logout
    get 'admin' => 'users#admin', as: :admin
    resources :users, only: [:new, :create, :show, :edit, :update, :destroy]

    post 'requests/new/album', to: 'requests#new_album', as: :new_request_album
    post 'requests/new/card' => 'requests#new_card', as: :new_request_card
    resources :requests, only: [:index, :new, :create, :show, :destroy]

    resources :artists, only: [:index, :new, :create, :show, :edit, :update, :destroy]
    resources :applications, only: [:index, :new, :create, :show, :edit, :update, :destroy]

    resources :problems, only: [:index, :new, :create, :show, :edit, :update]
  end

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
