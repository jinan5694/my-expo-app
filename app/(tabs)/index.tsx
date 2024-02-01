import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState, memo } from "react";
import { ActivityIndicator } from "react-native-paper";

type ItemProps = { title: string };

const Item = memo(({ title }: ItemProps) => {
  console.log("render item");

  return (
    <View
      style={{
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }}
      key={title}
    >
      <Text
        style={{
          fontSize: 32,
        }}
      >
        {title}
      </Text>
    </View>
  );
});

type Item = {
  id: number;
  title: string;
};
type Data = {
  list: Item[];
  total: number;
  pageSize: number;
};

// 模拟分页接口，需要返回 pagesize 和 total
// 可以通过修改方法内的 pageSize 和 total 来测试边界情况
async function queryList(page: number, pageSize: number = 10) {
  const total = 43;
  return new Promise<Data>((resolve) => {
    setTimeout(() => {
      const len = Math.min(total - (page - 1) * pageSize, pageSize);
      const list = Array.from({ length: len }).map((_, index) => {
        const num = (page - 1) * pageSize + index;
        return { id: num, title: `item of ${num + 1}` };
      });
      resolve({ list, total, pageSize });
    }, 500);
  });
}

export default function TabOneScreen() {
  // 数据
  const [data, setData] = useState<Item[]>([]);
  // 当前页数
  const [page, setPage] = useState(1);
  // 数据总数
  const [total, setTotal] = useState(0);
  // 下拉刷新的加载状态
  const [refreshing, setRefreshing] = useState(false);
  // 上拉刷新的加载状态
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    // 初始化查询数据
    onRefresh();
  }, []);

  // 查询第一页
  function onRefresh() {
    console.log("onRefresh");
    setRefreshing(true);
    queryList(1).then(({ list, total }) => {
      setData(list);
      setTotal(total);
      setPage(1); // 重置当前页码
      setRefreshing(false);
    });
  }

  // 触底事件
  function onEndReached() {
    console.log("onEndReached");
    // 如果 total 和 data 长度相等，说明请求到全部数据了。不继续发送请求
    if (total === data.length) return;

    setLoadMore(true);
    queryList(page + 1).then(({ list, total }) => {
      // 将数据连接起来
      const newData = data.concat(list);
      setData(newData);
      setLoadMore(false);
      setPage(page + 1);
    });
  }

  function LoadMore() {
    if (total === data.length) {
      return (
        <Text style={{ textAlign: "center", lineHeight: 30 }}>
          No more data
        </Text>
      );
    }
    if (loadMore) {
      return <ActivityIndicator></ActivityIndicator>;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id + ""}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={LoadMore}
      >
        <Text style={styles.title}>Tab One</Text>
      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
