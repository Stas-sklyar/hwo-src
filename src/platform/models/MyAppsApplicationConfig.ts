import { IApplicationConfig } from "UIElements/models/IApplicationConfig";
import { IMenuItemModel } from "UIElements/models/IMenutItemModel";
import React from "react";
import { FC } from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ApplicationServiceProvider from "platform/api/services/ApplicationService";

class MyAppsApplicationConfig implements IApplicationConfig {
  rootPath: string;
  menuItems: IMenuItemModel[];
  defaultView: string;

  constructor(_root: string) {
    this.rootPath = _root;
    this.menuItems = [];
    this.defaultView = '';
  }
}

export const MyAppsApplicationConfiguration = new MyAppsApplicationConfig(
  'MyApps',
);

ApplicationServiceProvider.RegisterApp(MyAppsApplicationConfiguration);