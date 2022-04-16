<section
    class="section section--meta"
>
    <dl>
        <dt>{{$t('common:label.published')}}</dt>
        <dd>{{$detail['detail']['published']}}</dd>
    </dl>
    <dl>
        <dt>{{$t('common:label.category')}}</dt>
        <dd>
            @foreach($detail['detail']['__categories'] as $category)
                <span>
                    {{$category['lang'][$lang]['title']}}
                </span>
            @endforeach
        </dd>
    </dl>
    <dl>
        <dt>{{$t('common:label.tags')}}</dt>
        <dd>
            @foreach($detail['detail']['__tags'] as $category)
                <span>
                    {{$category['name']}}
                </span>
            @endforeach
        </dd>
    </dl>
</section>