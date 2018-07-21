class GroupUsersController < ApplicationController
  @group = Group.find(params[:group_id])
  @users = User.all
end
