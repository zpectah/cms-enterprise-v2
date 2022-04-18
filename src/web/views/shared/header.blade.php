<div
    class="header-wrapper"
>
    @include('component.debug-bar')
    @include('component.maintenance-bar')
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
                    @include('component.navigation', [
                        'menuData' => $custom_data['header_menu'], // TODO #menu
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
