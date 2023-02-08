package com.mackenziehnc.table;

import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.TableViewManagerDelegate;
import com.facebook.react.viewmanagers.TableViewManagerInterface;

public abstract class TableViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> implements TableViewManagerInterface<T> {
  private final ViewManagerDelegate<T> mDelegate;

  public TableViewManagerSpec() {
    mDelegate = new TableViewManagerDelegate(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<T> getDelegate() {
    return mDelegate;
  }
}
