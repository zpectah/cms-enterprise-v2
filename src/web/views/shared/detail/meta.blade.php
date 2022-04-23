{{--
Detail meta data
--}}
@if($detail['detail'])
    <div class="shared-detail meta">
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.published')}}</dt>
            <dd class="ui-dd">{{$formatDate($detail['detail']['published'])}}</dd>
        </dl>
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.category')}}</dt>
            <dd class="ui-dd">
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
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.tags')}}</dt>
            <dd class="ui-dd">
                <div
                        class="hstack gap-2"
                >
                    @foreach($detail['detail']['__tags'] as $category)
                        <span
                                class="badge bg-dark"
                                style="background-color: {{$tag['color']}} !important;"
                        >
                    {{$category['name']}}
                </span>
                    @endforeach
                </div>
            </dd>
        </dl>
    </div>
@endif