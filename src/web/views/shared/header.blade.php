<div
    class="page-layout-header"
>
    @include('shared.debug-bar')
    @include('shared.maintenance-bar')
    <header class="header">
        <div class="container">
            <div class="row">
                <div class="col">
                    <a
                        href="{{$public['links']['home']}}"
                        class="header-brand"
                    >
                        {{$public['web_meta_title']}}
                    </a>
                </div>
                <div class="col">
                    @include('component.menu', [
                        'menuData' => $custom_data['header_menu'], // TODO #menu
                        'menuType' => 'horizontal',
                    ])
                </div>
                <div class="col">
                    @include('shared.language-toggle')
                </div>
            </div>
        </div>
    </header>
</div>
