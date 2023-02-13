package com.mackenziehnc.table;

import android.graphics.Color;

import androidx.annotation.Nullable;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

@ReactModule(name = TableViewManager.NAME)
public class TableViewManager extends TableViewManagerSpec<TableView> {

  public static final String NAME = "TableView";

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public TableView createViewInstance(ThemedReactContext context) {
    return new TableView(context);
  }

  @Override
  @ReactProp(name = "color")
  public void setColor(TableView view, @Nullable String color) {
    view.setBackgroundColor(Color.parseColor(color));
  }
}
