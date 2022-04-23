{{--
Layout header
--}}
<div
    class="page-layout-header"
>
    <header class="header">
        <div class="container">
            <div class="row">
                <div class="col">

                    <div class="header-container">

                        <div class="header-block primary">
                            <a
                                    href="{{$public['links']['home']}}"
                                    class="header-brand"
                            >
                                {{$public['web_meta_title']}}
                            </a>
                            <menu-toggle
                                class-name="menu-toggle"
                            />
                        </div>

                        <div class="header-block secondary" id="MainNavBar">
                            @include('component.menu', [
                                'menuData' => $custom_data['header_menu'], // TODO #menu
                                'menuType' => 'horizontal',
                            ])
                            @include('shared.language-toggle')
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </header>
</div>
