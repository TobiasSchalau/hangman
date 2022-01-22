{

    function abi_decode_available_length_t_string_memory_ptr(src, length, end) -> array {
        array := allocate_memory(array_allocation_size_t_string_memory_ptr(length))
        mstore(array, length)
        let dst := add(array, 0x20)
        if gt(add(src, length), end) { revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae() }
        copy_calldata_to_memory(src, dst, length)
    }

    function abi_decode_t_bytes1(offset, end) -> value {
        value := calldataload(offset)
        validator_revert_t_bytes1(value)
    }

    // string
    function abi_decode_t_string_memory_ptr(offset, end) -> array {
        if iszero(slt(add(offset, 0x1f), end)) { revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d() }
        let length := calldataload(offset)
        array := abi_decode_available_length_t_string_memory_ptr(add(offset, 0x20), length, end)
    }

    function abi_decode_t_uint256(offset, end) -> value {
        value := calldataload(offset)
        validator_revert_t_uint256(value)
    }

    function abi_decode_tuple_t_bytes1(headStart, dataEnd) -> value0 {
        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }

        {

            let offset := 0

            value0 := abi_decode_t_bytes1(add(headStart, offset), dataEnd)
        }

    }

    function abi_decode_tuple_t_uint256t_string_memory_ptr(headStart, dataEnd) -> value0, value1 {
        if slt(sub(dataEnd, headStart), 64) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }

        {

            let offset := 0

            value0 := abi_decode_t_uint256(add(headStart, offset), dataEnd)
        }

        {

            let offset := calldataload(add(headStart, 32))
            if gt(offset, 0xffffffffffffffff) { revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() }

            value1 := abi_decode_t_string_memory_ptr(add(headStart, offset), dataEnd)
        }

    }

    function abi_encode_t_address_to_t_address(value, pos) {
        mstore(pos, cleanup_t_address(value))
    }

    function abi_encode_t_bool_to_t_bool_fromStack(value, pos) {
        mstore(pos, cleanup_t_bool(value))
    }

    function abi_encode_t_bytes1_to_t_bytes1_fromStack(value, pos) {
        mstore(pos, cleanup_t_bytes1(value))
    }

    function abi_encode_t_bytes_memory_ptr_to_t_bytes_memory_ptr(value, pos) -> end {
        let length := array_length_t_bytes_memory_ptr(value)
        pos := array_storeLengthForEncoding_t_bytes_memory_ptr(pos, length)
        copy_memory_to_memory(add(value, 0x20), pos, length)
        end := add(pos, round_up_to_mul_of_32(length))
    }

    function abi_encode_t_enum$_Level_of_difficutlty_$16_to_t_uint8(value, pos) {
        mstore(pos, convert_t_enum$_Level_of_difficutlty_$16_to_t_uint8(value))
    }

    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr(value, pos) -> end {
        let length := array_length_t_string_memory_ptr(value)
        pos := array_storeLengthForEncoding_t_string_memory_ptr(pos, length)
        copy_memory_to_memory(add(value, 0x20), pos, length)
        end := add(pos, round_up_to_mul_of_32(length))
    }

    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value, pos) -> end {
        let length := array_length_t_string_memory_ptr(value)
        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length)
        copy_memory_to_memory(add(value, 0x20), pos, length)
        end := add(pos, round_up_to_mul_of_32(length))
    }

    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack(value, pos) -> end {
        let length := array_length_t_string_memory_ptr(value)
        pos := array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack(pos, length)
        copy_memory_to_memory(add(value, 0x20), pos, length)
        end := add(pos, length)
    }

    function abi_encode_t_stringliteral_4a45f30db69f8e2848611074482718fc6f6f3e72de7fb57462767786bbdb3df4_to_t_string_memory_ptr_nonPadded_inplace_fromStack(pos) -> end {
        pos := array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack(pos, 11)
        store_literal_in_memory_4a45f30db69f8e2848611074482718fc6f6f3e72de7fb57462767786bbdb3df4(pos)
        end := add(pos, 11)
    }

    function abi_encode_t_stringliteral_63282ef84d2e5e5d11a1af8f3b803a56d7d229fc0795f742b5591a7494062c27_to_t_string_memory_ptr_nonPadded_inplace_fromStack(pos) -> end {
        pos := array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack(pos, 21)
        store_literal_in_memory_63282ef84d2e5e5d11a1af8f3b803a56d7d229fc0795f742b5591a7494062c27(pos)
        end := add(pos, 21)
    }

    function abi_encode_t_stringliteral_f4488269bce4d1c61bb06b622ba72d6bac9b9ecbfb489777b1bbf620d96279ff_to_t_string_memory_ptr_nonPadded_inplace_fromStack(pos) -> end {
        pos := array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack(pos, 11)
        store_literal_in_memory_f4488269bce4d1c61bb06b622ba72d6bac9b9ecbfb489777b1bbf620d96279ff(pos)
        end := add(pos, 11)
    }

    // struct hangman.Game -> struct hangman.Game
    function abi_encode_t_struct$_Game_$42_memory_ptr_to_t_struct$_Game_$42_memory_ptr(value, pos)  -> end  {
        let tail := add(pos, 0xc0)

        {
            // true_word

            let memberValue0 := mload(add(value, 0x00))

            mstore(add(pos, 0x00), sub(tail, pos))
            tail := abi_encode_t_bytes_memory_ptr_to_t_bytes_memory_ptr(memberValue0, tail)

        }

        {
            // current_word

            let memberValue0 := mload(add(value, 0x20))

            mstore(add(pos, 0x20), sub(tail, pos))
            tail := abi_encode_t_bytes_memory_ptr_to_t_bytes_memory_ptr(memberValue0, tail)

        }

        {
            // word_length

            let memberValue0 := mload(add(value, 0x40))
            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x40))
        }

        {
            // number_failures

            let memberValue0 := mload(add(value, 0x60))
            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x60))
        }

        {
            // level

            let memberValue0 := mload(add(value, 0x80))
            abi_encode_t_enum$_Level_of_difficutlty_$16_to_t_uint8(memberValue0, add(pos, 0x80))
        }

        {
            // tried_letters

            let memberValue0 := mload(add(value, 0xa0))

            mstore(add(pos, 0xa0), sub(tail, pos))
            tail := abi_encode_t_bytes_memory_ptr_to_t_bytes_memory_ptr(memberValue0, tail)

        }

        end := tail
    }

    // struct hangman.Player -> struct hangman.Player
    function abi_encode_t_struct$_Player_$28_memory_ptr_to_t_struct$_Player_$28_memory_ptr_fromStack(value, pos)  -> end  {
        let tail := add(pos, 0xa0)

        {
            // player_address

            let memberValue0 := mload(add(value, 0x00))
            abi_encode_t_address_to_t_address(memberValue0, add(pos, 0x00))
        }

        {
            // nickname

            let memberValue0 := mload(add(value, 0x20))

            mstore(add(pos, 0x20), sub(tail, pos))
            tail := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr(memberValue0, tail)

        }

        {
            // free_games

            let memberValue0 := mload(add(value, 0x40))
            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x40))
        }

        {
            // won_games

            let memberValue0 := mload(add(value, 0x60))
            abi_encode_t_uint256_to_t_uint256(memberValue0, add(pos, 0x60))
        }

        {
            // game

            let memberValue0 := mload(add(value, 0x80))

            mstore(add(pos, 0x80), sub(tail, pos))
            tail := abi_encode_t_struct$_Game_$42_memory_ptr_to_t_struct$_Game_$42_memory_ptr(memberValue0, tail)

        }

        end := tail
    }

    function abi_encode_t_uint256_to_t_uint256(value, pos) {
        mstore(pos, cleanup_t_uint256(value))
    }

    function abi_encode_tuple_packed_t_stringliteral_63282ef84d2e5e5d11a1af8f3b803a56d7d229fc0795f742b5591a7494062c27_t_string_memory_ptr_t_stringliteral_f4488269bce4d1c61bb06b622ba72d6bac9b9ecbfb489777b1bbf620d96279ff_t_string_memory_ptr_t_stringliteral_4a45f30db69f8e2848611074482718fc6f6f3e72de7fb57462767786bbdb3df4_t_string_memory_ptr__to_t_string_memory_ptr_t_string_memory_ptr_t_string_memory_ptr_t_string_memory_ptr_t_string_memory_ptr_t_string_memory_ptr__nonPadded_inplace_fromStack_reversed(pos , value2, value1, value0) -> end {

        pos := abi_encode_t_stringliteral_63282ef84d2e5e5d11a1af8f3b803a56d7d229fc0795f742b5591a7494062c27_to_t_string_memory_ptr_nonPadded_inplace_fromStack( pos)

        pos := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack(value0,  pos)

        pos := abi_encode_t_stringliteral_f4488269bce4d1c61bb06b622ba72d6bac9b9ecbfb489777b1bbf620d96279ff_to_t_string_memory_ptr_nonPadded_inplace_fromStack( pos)

        pos := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack(value1,  pos)

        pos := abi_encode_t_stringliteral_4a45f30db69f8e2848611074482718fc6f6f3e72de7fb57462767786bbdb3df4_to_t_string_memory_ptr_nonPadded_inplace_fromStack( pos)

        pos := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack(value2,  pos)

        end := pos
    }

    function abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed(headStart , value0) -> tail {
        tail := add(headStart, 32)

        abi_encode_t_bool_to_t_bool_fromStack(value0,  add(headStart, 0))

    }

    function abi_encode_tuple_t_bytes1__to_t_bytes1__fromStack_reversed(headStart , value0) -> tail {
        tail := add(headStart, 32)

        abi_encode_t_bytes1_to_t_bytes1_fromStack(value0,  add(headStart, 0))

    }

    function abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed(headStart , value0) -> tail {
        tail := add(headStart, 32)

        mstore(add(headStart, 0), sub(tail, headStart))
        tail := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value0,  tail)

    }

    function abi_encode_tuple_t_struct$_Player_$28_memory_ptr__to_t_struct$_Player_$28_memory_ptr__fromStack_reversed(headStart , value0) -> tail {
        tail := add(headStart, 32)

        mstore(add(headStart, 0), sub(tail, headStart))
        tail := abi_encode_t_struct$_Player_$28_memory_ptr_to_t_struct$_Player_$28_memory_ptr_fromStack(value0,  tail)

    }

    function allocate_memory(size) -> memPtr {
        memPtr := allocate_unbounded()
        finalize_allocation(memPtr, size)
    }

    function allocate_unbounded() -> memPtr {
        memPtr := mload(64)
    }

    function array_allocation_size_t_string_memory_ptr(length) -> size {
        // Make sure we can allocate memory without overflow
        if gt(length, 0xffffffffffffffff) { panic_error_0x41() }

        size := round_up_to_mul_of_32(length)

        // add length slot
        size := add(size, 0x20)

    }

    function array_length_t_bytes_memory_ptr(value) -> length {

        length := mload(value)

    }

    function array_length_t_string_memory_ptr(value) -> length {

        length := mload(value)

    }

    function array_storeLengthForEncoding_t_bytes_memory_ptr(pos, length) -> updated_pos {
        mstore(pos, length)
        updated_pos := add(pos, 0x20)
    }

    function array_storeLengthForEncoding_t_string_memory_ptr(pos, length) -> updated_pos {
        mstore(pos, length)
        updated_pos := add(pos, 0x20)
    }

    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {
        mstore(pos, length)
        updated_pos := add(pos, 0x20)
    }

    function array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack(pos, length) -> updated_pos {
        updated_pos := pos
    }

    function checked_add_t_uint256(x, y) -> sum {
        x := cleanup_t_uint256(x)
        y := cleanup_t_uint256(y)

        // overflow, if x > (maxValue - y)
        if gt(x, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, y)) { panic_error_0x11() }

        sum := add(x, y)
    }

    function checked_add_t_uint8(x, y) -> sum {
        x := cleanup_t_uint8(x)
        y := cleanup_t_uint8(y)

        // overflow, if x > (maxValue - y)
        if gt(x, sub(0xff, y)) { panic_error_0x11() }

        sum := add(x, y)
    }

    function checked_div_t_uint256(x, y) -> r {
        x := cleanup_t_uint256(x)
        y := cleanup_t_uint256(y)
        if iszero(y) { panic_error_0x12() }

        r := div(x, y)
    }

    function checked_mul_t_uint256(x, y) -> product {
        x := cleanup_t_uint256(x)
        y := cleanup_t_uint256(y)

        // overflow, if x != 0 and y > (maxValue / x)
        if and(iszero(iszero(x)), gt(y, div(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, x))) { panic_error_0x11() }

        product := mul(x, y)
    }

    function checked_sub_t_uint256(x, y) -> diff {
        x := cleanup_t_uint256(x)
        y := cleanup_t_uint256(y)

        if lt(x, y) { panic_error_0x11() }

        diff := sub(x, y)
    }

    function cleanup_t_address(value) -> cleaned {
        cleaned := cleanup_t_uint160(value)
    }

    function cleanup_t_bool(value) -> cleaned {
        cleaned := iszero(iszero(value))
    }

    function cleanup_t_bytes1(value) -> cleaned {
        cleaned := and(value, 0xff00000000000000000000000000000000000000000000000000000000000000)
    }

    function cleanup_t_enum$_Level_of_difficutlty_$16(value) -> cleaned {
        cleaned := value validator_assert_t_enum$_Level_of_difficutlty_$16(value)
    }

    function cleanup_t_uint160(value) -> cleaned {
        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)
    }

    function cleanup_t_uint256(value) -> cleaned {
        cleaned := value
    }

    function cleanup_t_uint8(value) -> cleaned {
        cleaned := and(value, 0xff)
    }

    function convert_t_enum$_Level_of_difficutlty_$16_to_t_uint8(value) -> converted {
        converted := cleanup_t_enum$_Level_of_difficutlty_$16(value)
    }

    function copy_calldata_to_memory(src, dst, length) {
        calldatacopy(dst, src, length)
        // clear end
        mstore(add(dst, length), 0)
    }

    function copy_memory_to_memory(src, dst, length) {
        let i := 0
        for { } lt(i, length) { i := add(i, 32) }
        {
            mstore(add(dst, i), mload(add(src, i)))
        }
        if gt(i, length)
        {
            // clear end
            mstore(add(dst, length), 0)
        }
    }

    function extract_byte_array_length(data) -> length {
        length := div(data, 2)
        let outOfPlaceEncoding := and(data, 1)
        if iszero(outOfPlaceEncoding) {
            length := and(length, 0x7f)
        }

        if eq(outOfPlaceEncoding, lt(length, 32)) {
            panic_error_0x22()
        }
    }

    function finalize_allocation(memPtr, size) {
        let newFreePtr := add(memPtr, round_up_to_mul_of_32(size))
        // protect against overflow
        if or(gt(newFreePtr, 0xffffffffffffffff), lt(newFreePtr, memPtr)) { panic_error_0x41() }
        mstore(64, newFreePtr)
    }

    function increment_t_uint256(value) -> ret {
        value := cleanup_t_uint256(value)
        if eq(value, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff) { panic_error_0x11() }
        ret := add(value, 1)
    }

    function panic_error_0x11() {
        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)
        mstore(4, 0x11)
        revert(0, 0x24)
    }

    function panic_error_0x12() {
        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)
        mstore(4, 0x12)
        revert(0, 0x24)
    }

    function panic_error_0x21() {
        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)
        mstore(4, 0x21)
        revert(0, 0x24)
    }

    function panic_error_0x22() {
        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)
        mstore(4, 0x22)
        revert(0, 0x24)
    }

    function panic_error_0x32() {
        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)
        mstore(4, 0x32)
        revert(0, 0x24)
    }

    function panic_error_0x41() {
        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)
        mstore(4, 0x41)
        revert(0, 0x24)
    }

    function revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d() {
        revert(0, 0)
    }

    function revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae() {
        revert(0, 0)
    }

    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {
        revert(0, 0)
    }

    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {
        revert(0, 0)
    }

    function round_up_to_mul_of_32(value) -> result {
        result := and(add(value, 31), not(31))
    }

    function store_literal_in_memory_4a45f30db69f8e2848611074482718fc6f6f3e72de7fb57462767786bbdb3df4(memPtr) {

        mstore(add(memPtr, 0), 0x0a20332067616d65733a20000000000000000000000000000000000000000000)

    }

    function store_literal_in_memory_63282ef84d2e5e5d11a1af8f3b803a56d7d229fc0795f742b5591a7494062c27(memPtr) {

        mstore(add(memPtr, 0), 0x47616d6520636f7374733a0a20312067616d653a200000000000000000000000)

    }

    function store_literal_in_memory_f4488269bce4d1c61bb06b622ba72d6bac9b9ecbfb489777b1bbf620d96279ff(memPtr) {

        mstore(add(memPtr, 0), 0x0a20322067616d65733a20000000000000000000000000000000000000000000)

    }

    function validator_assert_t_enum$_Level_of_difficutlty_$16(value) {
        if iszero(lt(value, 3)) { panic_error_0x21() }
    }

    function validator_revert_t_bytes1(value) {
        if iszero(eq(value, cleanup_t_bytes1(value))) { revert(0, 0) }
    }

    function validator_revert_t_uint256(value) {
        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }
    }

}
