{{--
Detail links
--}}
@if($detail['detail']['__links'])
    <div class="shared-detail links">
        <ul>
            @foreach($detail['detail']['__links'] as $link)
                <li>
                    <a
                            href="{{$link}}"
                            target="_blank"
                            class=""
                    >
                        {{$link}}
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
@endif