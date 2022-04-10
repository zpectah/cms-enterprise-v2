<header class="header page-layout-header">
    <div class="container">
        <div class="row">
            <div class="col">
                header
            </div>
            <div class="col">
                @include('component.menu-horizontal', [
                    'menuData' => $menu['primary']['main-menu'],
                ])
            </div>
        </div>
    </div>
</header>