<div
    class="header-wrapper"
>
    @include('shared.debug-bar')
    @include('shared.maintenance-bar')
    <header class="header">
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
                <div class="col">
                    @include('shared.language-toggle')
                </div>
            </div>
        </div>
    </header>
</div>
