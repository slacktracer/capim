<template>
  <div class="btn-group">
    <button class="btn btn-primary" type="submit">Search</button>
    <button
      class="btn btn-primary dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown"
      type="button"
    >
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
      <li>
        <button class="dropdown-item" type="submit" value="invalidate">
          Refresh
        </button>
      </li>
    </ul>
  </div>
</template>
