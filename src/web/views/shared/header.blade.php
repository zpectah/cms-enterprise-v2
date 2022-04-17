<header class="header page-layout-header">
    <div class="container">
        <div class="row">
            <div class="col">
                <a
                    href="{{$public['home_link']}}"
                    class="header-brand"
                >
                    {{$public['web_meta_title']}}
                </a>
            </div>
            <div class="col">
                @include('component.navigation', [
                    'menuData' => $menu['primary']['main-menu'],
                    'type' => 'horizontal',
                ])
            </div>
        </div>
    </div>
</header>