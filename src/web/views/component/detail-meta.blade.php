@if($detail['detail'])
    <section
        class="section section--meta"
    >
        <dl>
            <dt>{{$t('common:label.published')}}</dt>
            <dd>{{$formatDate($detail['detail']['published'])}}</dd>
        </dl>
        <dl>
            <dt>{{$t('common:label.category')}}</dt>
            <dd>
                <div
                    class="hstack gap-2"
                >
                    @foreach($detail['detail']['__categories'] as $category)
                        <span
                            class="badge bg-info"
                        >
                    {{$category['lang'][$lang]['title']}}
                </span>
                    @endforeach
                </div>
            </dd>
        </dl>
        <dl>
            <dt>{{$t('common:label.tags')}}</dt>
            <dd>
                <div
                    class="hstack gap-2"
                >
                    @foreach($detail['detail']['__tags'] as $category)
                        <span
                            class="badge bg-dark"
                        >
                    {{$category['name']}}
                </span>
                    @endforeach
                </div>
            </dd>
        </dl>
    </section>
@endif