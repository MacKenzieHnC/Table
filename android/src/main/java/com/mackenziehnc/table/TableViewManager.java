package com.mackenziehnc.table;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;

@ReactModule(name = TableViewManager.NAME)
public class TableViewManager extends com.mackenziehnc.table.TableViewManagerSpec<TableView> {

  public static final String NAME = "TableView";

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public TableView createViewInstance(ThemedReactContext context) {
    return new TableView(context);
  }
}
