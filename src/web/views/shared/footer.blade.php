<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col">
                <small>
                    &copy; {{$public['project']['copyright_year']}}
                    <a
                        href="{{$public['home_link']}}"
                    >
                        {{$public['web_meta_title']}}
                    </a>
                    |
                    {{$t('common:label.all_rights')}}
                    |
                    <a
                        href="/admin"
                        target="_blank"
                    >
                        {{$public['project']['meta']['name']}} v{{$public['project']['meta']['version']}}
                    </a>
                </small>
            </div>
            <div
                class="col"
            >
                @include('widget.widget-social-links')
            </div>
        </div>
    </div>
</footer>