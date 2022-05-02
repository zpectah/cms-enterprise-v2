{{--
Detail meta data
--}}
@if(isset($detail['detail']))
    <div class="shared-detail meta">
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.published')}}</dt>
            <dd class="ui-dd">{{$formatDate($detail['detail']['published'])}}</dd>
        </dl>
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.category')}}</dt>
            <dd class="ui-dd">
                <div class="hstack gap-2">
                    @foreach($detail['detail']['__categories'] as $category)
                        <span class="ui-chip">
                            {{$category['lang'][$lang]['title']}}
                        </span>
                    @endforeach
                </div>
            </dd>
        </dl>
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.tags')}}</dt>
            <dd class="ui-dd">
                <div class="hstack gap-2">
                    @foreach($detail['detail']['__tags'] as $tag)
                        <span class="ui-chip" style="border-color: {{$tag['color']}};color: {{$tag['color']}};">
                            {{$tag['name']}}
                        </span>
                    @endforeach
                </div>
            </dd>
        </dl>
    </div>
@endif